const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getContacts=asyncHandler (async (req, res) => {
    const contact=await Contact.find({user_id:req.user.id});
    res.status(200).json({message:'Get all contacts',
        data:contact
    });
  });

//@desc Get contact by ID
//@route GET /api/contacts/:id
//@access Private
const getContactById=asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    // Check if the contact was found
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized to view other user's contact");
    }
    res.status(200).json(contact); });

//@desc Create a new contact
//@route POST /api/contacts
//@access Private
const createContact=asyncHandler(async(req, res) => {
    console.log("req.body", req.body);
    const {name,phone,email}= req.body;
    if(!name || !phone || !email){
        res.status(400);
        throw new Error('All fields are mandatory');
        //return res.status(400).json({ error: 'All fields are mandatory' });
    }
    const contact= await Contact.create({
        user_id:req.user.id,
        name,
        phone,
        email
    });
    // Check if 'name' and 'email' are provided in the request body
    res.status(201).json({message:'Create a new contact',
        data:contact
    }); });

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access Private
const updateContact=asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    // Check if the contact was found
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized to update other user's contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true
         } // Return the updated contact
    );
    res.status(200).json(updatedContact); });

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact=asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    // Check if the contact was found
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized to delete other user's contact");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact); });


module.exports= {getContacts, getContactById,createContact,updateContact,deleteContact};