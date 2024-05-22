const express = require('express');
const router = express.Router();
const { pool } = require('../config/connection'); // Ensure this path is correct
const path = require('path');

// Serve the daily report HTML
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'daily-report.html'));
});

// Route to handle daily report submission
router.post('/', async (req, res) => {
    const {
        date, job_number, t_and_m, contract, foreman, cell_number, customer, customer_po,
        job_site, job_description, job_completion, siding, roofing, flashing, miscellaneous,
        trucks, welders, generators, compressors, fuel, scaffolding, safety_equipment,
        miscellaneous_equipment, material_description, equipment_description, hours_worked,
        employee, straight_time, double_time, time_and_a_half, emergency_purchases,
        approved_by, title, content, admin_id, shift_start_time, temperature_humidity, report_copy
    } = req.body;

    console.log('Received data:', req.body); // Log received data

    const sql = `
        INSERT INTO daily_reports (
            date, job_number, t_and_m, contract, foreman, cell_number, customer, customer_po,
            job_site, job_description, job_completion, siding, roofing, flashing, miscellaneous,
            trucks, welders, generators, compressors, fuel, scaffolding, safety_equipment,
            miscellaneous_equipment, material_description, equipment_description, hours_worked,
            employee, straight_time, double_time, time_and_a_half, emergency_purchases,
            approved_by, title, content, admin_id, shift_start_time, temperature_humidity, report_copy
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        date, job_number, t_and_m ? 1 : 0, contract ? 1 : 0, foreman, cell_number, customer, customer_po,
        job_site, job_description, job_completion, siding, roofing, flashing, miscellaneous,
        trucks, welders, generators, compressors, fuel, scaffolding, safety_equipment,
        miscellaneous_equipment, material_description, equipment_description, hours_worked,
        employee, straight_time, double_time, time_and_a_half, emergency_purchases,
        approved_by, title, content, admin_id, shift_start_time, temperature_humidity, report_copy
    ];

    try {
        await pool.query(sql, values);
        res.status(201).json({ message: 'Daily report submitted successfully' });
    } catch (error) {
        console.error('Error inserting data:', error.sqlMessage);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
