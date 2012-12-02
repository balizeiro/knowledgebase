/*
 * GET dashboard
 */

exports.index = function(req, res){
  	res.render('dashboard', { title: 'Dashboard' });
};