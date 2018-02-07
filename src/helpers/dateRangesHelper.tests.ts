import "mocha";
import { assert } from "chai";
import { compile, registerHelper, unregisterHelper } from "handlebars";
import { dateRangesHelper, isContiguosDate } from "./dateRangesHelper";

describe('dateRangesHelper', () => {
    before(() => {
        registerHelper('date-ranges', dateRangesHelper);
    });

    after(() => {
        unregisterHelper('date-ranges');
    });

    describe('isContiguosDate', () => {
        it(`returns true for contiguous dates`, () => {
            assert.isTrue(isContiguosDate('2018-01-31', '2018-02-01'));
        });
    
        it(`returns false for non-contiguous dates`, () => {
            assert.isFalse(isContiguosDate('2018-02-06', '2018-02-08'));
        });
    });

    it(`returns empty string for null`, () => {
        const template = compile(`{{date-ranges values}}`);
        const actual = template({ dates: null });
        assert.strictEqual(actual, '');
    });

    it('returns single date', () => {
        const template = compile(`{{date-ranges dates}}`);
        const values = [
            '2018-01-05'
        ];
        const actual = template({ dates: values });
        assert.strictEqual(actual, `1/5/2018`);
    });

    it('returns non-distinct dates', () => {
        const template = compile(`{{date-ranges dates}}`);
        const values = [
            '2018-01-06',
            '2018-01-06'
        ];
        const actual = template({ dates: values });
        assert.strictEqual(actual, `1/6/2018`);
    });

    it('returns single range', () => {
        const template = compile(`{{date-ranges dates}}`);
        const values = [
            '2018-02-01',
            '2018-01-31'
        ];
        const actual = template({ dates: values });
        assert.strictEqual(actual, `1/31/2018 - 2/1/2018`);
    });

    it('returns multiple ranges', () => {
        const template = compile(`{{date-ranges dates}}`);
        const values = [
            '2016-10-08',
            '2016-10-09',
            '2016-10-10',
            '2016-10-15',
            '2016-10-16'
        ];
        const actual = template({ dates: values });
        assert.strictEqual(actual, `10/8/2016 - 10/10/2016, 10/15/2016 - 10/16/2016`);
    });

    it('returns non-contiguous ranges', () => {
        const template = compile(`{{date-ranges dates}}`);
        const values = [
            '2017-07-08',
            '2017-07-11',
            '2017-09-10',
            '2017-09-11',
            '2017-11-16'
        ];
        const actual = template({ dates: values });
        assert.strictEqual(actual, `7/8/2017, 7/11/2017, 9/10/2017 - 9/11/2017, 11/16/2017`);
    });

    it('returns with custom seperator', () => {
        const template = compile(`{{date-ranges dates ' | '}}`);
        const values = [
            '2017-07-08',
            '2017-07-11',
            '2017-09-10',
            '2017-09-11',
            '2017-11-16'
        ];
        const actual = template({ dates: values });
        assert.strictEqual(actual, `7/8/2017 | 7/11/2017 | 9/10/2017 - 9/11/2017 | 11/16/2017`);
    });

    it('returns with custom date format', () => {
        const template = compile(`{{date-ranges dates ', ' 'MMM D YYYY'}}`);
        const values = [
            '2018-02-01',
            '2018-01-31'
        ];
        const actual = template({ dates: values });
        assert.strictEqual(actual, `Jan 31 2018 - Feb 1 2018`);
    });

    it('returns with custom culture', () => {
        const template = compile(`{{date-ranges dates ', ' 'L' 'en-gb'}}`);
        const values = [
            '2018-02-01',
            '2018-01-31'
        ];
        const actual = template({ dates: values });
        assert.strictEqual(actual, `31/01/2018 - 01/02/2018`);
    });
});