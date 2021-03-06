const models = require('../models');

exports.get_landing = function(req, res, next) {
  res.render('lead/landing', { title: 'Express', user:req.user });
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
    res.render('lead/leads',{title:'Lead Table', leads:leads});
  });
}

exports.show_lead = function(req, res, next) {
  return models.Lead.findOne({
    where : {
      id: req.params.lead_id
    }
  }).then(lead=>{
    res.render('lead/lead',{title:`Email with id ${lead.id}`,lead:lead});
  });
}

exports.show_edit_lead = function(req,res,next){
  return models.Lead.findOne({
    where:{
      id:req.params.lead_id
    }
  }).then(lead=>{
    res.render('lead/edit_lead',{lead:lead});
  });
}

exports.edit_lead = function(req, res, next) {
  return models.Lead.update({
    email:req.body.lead_email
  },{
    where: {
      id:req.params.lead_id
    }
  }).then(result=>{
    res.redirect('/lead/'+req.params.lead_id);
  });
}

exports.delete_lead = function(req,res,next){
  return models.Lead.destroy({
    where: {
      id: req.params.lead_id
    }
  }).then(result=>{
    res.redirect("/leads");
  });
}
