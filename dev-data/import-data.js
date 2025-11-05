const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('../models/destinationModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successfull'));

const destinations = JSON.parse(
  fs.readFileSync('./dev-data/data/destinations.json', 'utf-8')
);

const importData = async () => {
  try {
    await Destination.create(destinations);
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await Destination.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
