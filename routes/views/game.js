var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'game';

	locals.data = {
		attribute: "GameSettings",
		preferences: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			title: locals.data.attribute,
		}).populate('author categories');


		q.exec(function (err, result) {
			var settings = JSON.parse(result.custom);
			for (var name in settings) {
				var preference = {};
				preference.name = name;
				preference.value = settings[name];
				locals.data.preferences.push(preference);
			}
			next(err);
		});

	});

	// Render the view
	view.render('game');

};
