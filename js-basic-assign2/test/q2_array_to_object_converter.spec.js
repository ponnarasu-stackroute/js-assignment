const chai = require('chai');
const expect = chai.expect;
const convert = require('../solutions/q2_array_to_object_converter.js');

const testObj = [{ id: 1, name: 'Ankit', role: 'Developer'},
				{ id: 2, name: 'Pankhuri', role: 'Lead'},
				{ id: 3, name: 'Anubha', role: 'QA'}];

describe('Testing - array_to_object_converter', () => {
	it('module return type test case', (done) => {
		expect(typeof convert).to.deep.equal('function');
		done();
	});

	it('function return type test case', (done) => {
		expect(typeof convert(testObj, 'role')).to.deep.equal('object');
		done();
	});

	it('positive test case', (done) => {
		expect(convert(testObj, 'role')).to.deep.equal(
			{
				Developer: { id: 1, name: 'Ankit', role: 'Developer'},
				Lead: { id: 2, name: 'Pankhuri', role: 'Lead'},
				QA: { id: 3, name: 'Anubha', role: 'QA'}
			}
		);
		done();
	});

	it('negative test case', (done) => {
		expect(convert('invalid value')).to.deep.equal(null);
		done();
	});
});
