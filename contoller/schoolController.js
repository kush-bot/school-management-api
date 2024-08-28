const connection = require('../db/dbSetup.js');

const insertSchool=async(req,res)=>{
    const {name, address, latitude,longitude}=req.body;
    console.log(name,address,latitude,longitude);
     // Validate the input data
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
  }
  if (!address || typeof address !== 'string' || address.trim() === '') {
    return res.status(400).json({ error: 'Address is required and must be a non-empty string.' });
  }
  if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
    return res.status(400).json({ error: 'Latitude must be a number between -90 and 90.' });
  }
  if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: 'Longitude must be a number between -180 and 180.' });
  }

  try{
    const query=` INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)` ;
    const [result] = await connection.promise().query(query, [name, address, latitude, longitude])
    res.status(200).json({message:"data insert into school table succesfully"});
    return;
  }catch(err){
    //debugging
    console.error("something wrong happend",err.stack);
    res.status(500).json({ error: 'Internal server error' })
  }
}

const listSchool=async(req,res)=>{
    const {latitude,longitude}= req.query;
    //console.log(latitude,longitude);
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Valid latitude and longitude are required.' });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const query = `
    SELECT id, name, address, latitude, longitude,
    (6371 * acos(
      cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
      sin(radians(?)) * sin(radians(latitude))
    )) AS distance
FROM schools
ORDER BY distance ASC;
  `;
  

  try {
    const [rows] = await connection.promise().query(query, [userLat, userLon, userLat]);
    console.log(rows);
    res.status(200).json({ schools: rows });
  } catch (err) {
    console.error("Error fetching schools:", err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
    
}

module.exports={insertSchool,listSchool};