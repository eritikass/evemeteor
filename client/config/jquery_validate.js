/**
 * jQuery validator setup
 *
 * Created by eritikass on 24/02/16.
 */

$.validator.addMethod(
    "regex",    // method name
    function(value, element, regexp) {
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input." // default err
);

$.validator.setDefaults({
    rules: {
        eve_api_key_id: {
            required: true,
            digits: true,
            maxlength: 12
        },
        eve_api_v_code: {
            required: true,
            minlength: 10,
            maxlength: 200,
            regex: /^\w+$/,
        },
        eve_api_addgroup: {
            minlength: 5,
            maxlength: 30,
        }
    },
    messages: {
        eve_api_key_id: {
            required: "Please enter key id.",
            digits: "KeyID have to be number",
        },
        eve_api_v_code: {
            required: "Please enter V-Code.",
            minlength: "V-Code must be at least {0} characters, it's not safe to use so short keys",
            maxlength: "V-Code can't be more than {0} characters.",
            regex: "Please enter valid V-Code, a-z, 0-9 and no spaces.",
        },
    }
});