const chai = require('chai');
const expect = chai.expect;
const flatten = require('../solutions/q3_flatten_n_dimensional_array.js');

describe('Testing - flatten_n_dimensional_array', () => {
	it('module return type test case', (done) => {
		expect(typeof flatten).to.deep.equal('function');
		done();
	});

	it('positive test case', (done) => {
		expect(flatten([1, [2, 3], [[4, 5], [6, 7]], [[[8, 9], 10]]]))
		.to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		done();
	});

	it('negative test case', (done) => {
		expect(flatten('invalid value')).to.deep.equal(null);
		done();
	});
});
