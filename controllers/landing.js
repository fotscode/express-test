const models = require('../models');

exports.get_landing = function(req, res, next) {
  res.render('landing', { title: 'Express' });
}

exports.submit_lead = function(req, res, next) {
  return models.Lead.create({
    email:req.body.lead_email
  }).then(lead=>{
    res.redirect("/leads");
  });
}

exports.show_leads = function(req, res, next) {
  return models.Lead.findAll().then(leads=>{
    res.render('leads',{title:'Lead Table', leads:leads});
  });
}

exports.show_lead = function(req, res, next) {
  return models.Lead.findOne({
    where : {
      id: req.params.lead_id
    }
  }).then(lead=>{
    res.render('lead',{title:`Email with id ${lead.id}`,lead:lead});
  });
}
