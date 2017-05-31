$(document).ready(function () {

    $('.spoiler .spoilerBtn').click(function () {
        $(this).toggleClass('Active');
        $(this).parents().find('.spoilerContent').toggle(500);
    });



});


