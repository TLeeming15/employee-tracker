const express = require('express');
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

const app = express();
app.use(express.json());
