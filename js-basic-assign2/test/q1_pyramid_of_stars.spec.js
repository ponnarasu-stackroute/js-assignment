const chai = require('chai');
const expect = chai.expect;
const pyramid = require('../solutions/q1_pyramid_of_stars.js');

describe('Testing - pyramid_of_stars', () => {
	it('module return type test case', (done) => {
		expect(typeof pyramid).to.deep.equal('function');
		done();
	});

	it('positive test case for odd count of height', (done) => {
		expect(pyramid(5)).equal(
			'     *  \n    * *  \n   * * *  \n  * * * *  \n * * * * *  \n');
		done();
	});

	it('positive test case for even count of height', (done) => {
		expect(pyramid(6)).equal(
			'      *  \n     * *  \n    * * *  \n   * * * *  \n  * * * * *  \n * * * * * *  \n');
		done();
	});

	it('negative test case', (done) => {
		expect(pyramid('invalid value')).to.deep.equal('');
		done();
	});
});
