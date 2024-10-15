const express = require("express");
const mongoose = require("mongoose");
const router = express.Router()

const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")


const ADMIN = mongoose.model("ADMIN");

const requireLogin = require("../middleWares/requireLogin");




router.put("/adminData/:adminid", async (req, res) => {
  const aid = req.params.adminid;
  const updatedData = req.body;

  console.log("Admin ID:", aid);
  console.log("Updated Data:", updatedData);

  try {
      const admin = await ADMIN.findById(aid);
      if (!admin) {
          return res.status(404).json({ error: "Admin not found" });
      }
      admin.Academic.push(updatedData);
      await admin.save();
      console.log("Updated Document:", admin);

      return res.json({
          message: "Document updated successfully",
          updatedDocument: admin,
      });
  } catch (error) {
      console.error("Error updating document:", error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/adminDataDelete/:adminid", async (req, res) => {
    const aid = req.params.adminid;
    const itemToDelete = req.body; // Data to delete from Academic
  
    console.log("Admin ID:", aid);
    console.log("Data to Delete:", itemToDelete);
  
    try {
      const admin = await ADMIN.findById(aid);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
  
      // Pull the item from the Academic array
      admin.Academic.pull(itemToDelete);
      await admin.save();
      console.log("Updated Document after Deletion:", admin);
  
      return res.json({
        message: "Item deleted successfully",
        updatedDocument: admin,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  



router.put("/adminDataAchievement/:adminid", async (req, res) => {
    const aid = req.params.adminid;
    const updatedData = req.body;
  
    console.log("Admin ID:", aid);
    console.log("Updated Data:", updatedData);
  
    try {
        const admin = await ADMIN.findById(aid);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        admin.Achievements.push(updatedData);
        await admin.save();
        console.log("Updated Document:", admin);
        return res.json({
            message: "Document updated successfully",
            updatedDocument: admin,
        });
    } catch (error) {
        console.error("Error updating document:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/adminAchievementDelete/:adminid", async (req, res) => {
    const aid = req.params.adminid;
    const itemToDelete = req.body; // Data to delete from Academic
  
    console.log("Admin ID:", aid);
    console.log("Data to Delete:", itemToDelete);
  
    try {
      const admin = await ADMIN.findById(aid);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
  
      // Pull the item from the Academic array
      admin.Achievements.pull(itemToDelete);
      await admin.save();
      console.log("Updated Document after Deletion:", admin);
  
      return res.json({
        message: "Item deleted successfully",
        updatedDocument: admin,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });



  router.put("/adminDataTechnical/:adminid", async (req, res) => {
    const aid = req.params.adminid;
    const updatedData = req.body;
  
    console.log("Admin ID:", aid);
    console.log("Updated Data:", updatedData);
  
    try {
        const admin = await ADMIN.findById(aid);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        admin.Technical.push(updatedData);
        await admin.save();
        console.log("Updated Document:", admin);
        return res.json({
            message: "Document updated successfully",
            updatedDocument: admin,
        });
    } catch (error) {
        console.error("Error updating document:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/adminTechnicalDelete/:adminid", async (req, res) => {
    const aid = req.params.adminid;
    const itemToDelete = req.body; // Data to delete from Academic
  
    console.log("Admin ID:", aid);
    console.log("Data to Delete:", itemToDelete);
  
    try {
      const admin = await ADMIN.findById(aid);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
  
      // Pull the item from the Academic array
      admin.Technical.pull(itemToDelete);
      await admin.save();
      console.log("Updated Document after Deletion:", admin);
  
      return res.json({
        message: "Item deleted successfully",
        updatedDocument: admin,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });




  router.put("/adminDataExtra/:adminid", async (req, res) => {
    const aid = req.params.adminid;
    const updatedData = req.body;
  
    console.log("Admin ID:", aid);
    console.log("Updated Data:", updatedData);
  
    try {
        const admin = await ADMIN.findById(aid);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        admin.Extra.push(updatedData);
        await admin.save();
        console.log("Updated Document:", admin);
        return res.json({
            message: "Document updated successfully",
            updatedDocument: admin,
        });
    } catch (error) {
        console.error("Error updating document:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/adminExtraDelete/:adminid", async (req, res) => {
    const aid = req.params.adminid;
    const itemToDelete = req.body; // Data to delete from Academic
  
    console.log("Admin ID:", aid);
    console.log("Data to Delete:", itemToDelete);
  
    try {
      const admin = await ADMIN.findById(aid);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
  
      // Pull the item from the Academic array
      admin.Extra.pull(itemToDelete);
      await admin.save();
      console.log("Updated Document after Deletion:", admin);
  
      return res.json({
        message: "Item deleted successfully",
        updatedDocument: admin,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });


  



  router.post('/addProject/:userId', async (req, res) => {
    try {
      const { title, points } = req.body;
      const user = await ADMIN.findById(req.params.userId);
      
      if (user) {
        user.Projects.push({ title, points });
        await user.save();
        res.json({ message: 'Project added successfully', user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });


  router.delete("/adminProjectDelete/:adminid", async (req, res) => {
    const aid = req.params.adminid;
    const itemToDelete = req.body; // Data to delete from Academic
  
    console.log("Admin ID:", aid);
    console.log("Data to Delete:", itemToDelete);
  
    try {
      const admin = await ADMIN.findById(aid);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
  
      // Pull the item from the Academic array
      admin.Projects.pull(itemToDelete);
      await admin.save();
      console.log("Updated Document after Deletion:", admin);
  
      return res.json({
        message: "Item deleted successfully",
        updatedDocument: admin,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });


























module.exports = router;