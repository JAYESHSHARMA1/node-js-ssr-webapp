// Wait for the DOM to be ready

$(function () {
    // Initialize form validation on the registration form.
    // It has the name attribute "loginForm"
    $("form[name='loginForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        // Specify validation error messages
        messages: {
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            },
            email: "Please enter a valid email address"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });


 
        

    $("form[name='createNewAccountForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name: {
                required: true
            },
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            'privacy-policy':{
                required:true
            }
        },
        // Specify validation error messages
        messages: {
            name: 'Name is required',
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            },
            email: "Please enter a valid email address",
            'privacy-policy': "Required"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });

    $("form[name='forgotPassForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
         
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            }
           
        },
        // Specify validation error messages
        messages: {
            email: "Please enter a valid email address",
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });



    $("form[name='changePasswordForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
         
            currentPassword: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
            },
            newPassword: {
                required: true,
                minlength : 5,

                // Specify that email should be validated
                // by the built-in "email" rule
            },
            confirmNewPassword: {
                required: true,
                minlength : 5,
                equalTo : "#newPassword"
                // Specify that email should be validated
                // by the built-in "email" rule
            },
           
        },
        // Specify validation error messages
        conformNewPassword: {
            equalTo: "Password not matched",
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });


    updateProfileForm


});