const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
	try {
		const { name } = req.body;
		// const category = await new Category({ name, slug: slugify(name) }).save();
		// res.json(category);
		res.json(await new Category({ name, slug: slugify(name) }).save());
	} catch (error) {
		// console.log(error);
		res.status(400).send('Create category failed');
	}
};

exports.list = async (req, res) => {
	res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
	let category = await Category.findOne({ slug: req.params.slug }).exec();
	res.json(category);
};

exports.remove = async (req, res) => {
	try {
		let deleted = await Category.findOneAndDelete({
			slug: req.params.slug,
		}).exec();
		res.json(deleted);
	} catch (error) {
		res.status(400).send('Delete category failed');
	}
};

exports.update = async (req, res) => {
	const { name } = req.body;
	try {
		const updated = await Category.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, slug: slugify(name) },
			{ new: true }
		);
		res.json(updated);
	} catch (error) {
		res.status(400).send('Updated category failed ' + error.message);
	}
};
