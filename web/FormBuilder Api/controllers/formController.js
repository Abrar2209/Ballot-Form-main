import db from "../index.js";

const Form = db.forms;

// Create form
export const createForm = async (req, res) => {
  const { id, formtitle, shortcode, componentJSON, headerJSON, footerJSON, status, } = req.body;

  const info = { id, formtitle, shortcode, componentJSON, headerJSON, footerJSON, status, };

  const form = await Form.create(info);
  res.status(200).send(form);
};

// Get all forms
export const getForms = async (req, res) => {
  try {
    const forms = await Form.findAll();
    if (forms) {
      res.status(200).json({
        forms: forms,
      });
    } else {
      res.status(400).json({
        forms: `Form table is empty!`,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get form by id 
export const getForm = async (req, res) => {
  try {
    const form = await Form.findOne({
      where: {
        id: req.id,
      },
    });
    if (form) {
      res.status(200).json({
        forms: form,
      });
    } else {
      res.status(400).json({
        forms: `No form was found with the given ID: ${req.id}. Please provide a valid ID to fetch the form.`,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Form
export const deleteForm = async (req, res) => {
  try {
    const form = await Form.findOne({
      where: {
        id: req.id,
      },
    });

    if (form) {
      await Form.destroy({ where: { id: req.id } });
      res.status(200).send("Form is deleted !");
    } else {
      res.status(400).json({
        forms: `No form was found with the given ID: ${req.id}. Please provide a valid ID to fetch the form.`,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};


// update form
export const updateform = async(req, res) => {

  const { formtitle, componentJSON, headerJSON, footerJSON, status } = req.body;

  try{
    const form = await Form.findOne({
      where: {
        id: req.id,
      },
    });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
  
    const updates = {};
    if ('formtitle' in req.body) updates.formtitle = formtitle;
    if ('componentJSON' in req.body) updates.componentJSON = componentJSON;
    if ('headerJSON' in req.body) updates.headerJSON = headerJSON;
    if ('footerJSON' in req.body) updates.footerJSON = footerJSON;
    if ('status' in req.body) updates.status = status;
  
    await form.update(updates);
    res.status(200).send(form);
  }catch(error){
    res.status(400).send(error);
  }
}
