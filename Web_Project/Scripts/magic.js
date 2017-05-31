$(document).ready(function () {

    var fileId = "#file";
    var submitId = "#submit";
    var previewID = "#preview";
    var fileInfo = {};

    var images = [];
    init();
    //preview
    $(fileId).change(function () {
        var file = this.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var filedata = e.target.result;
            $(previewID).attr("src", filedata);
            fileInfo.filename = file.name;
            fileInfo.data = filedata;
        }
        reader.readAsDataURL(file);

    });
    //load gallery

    //increase/decrease img
    $('.pict').on('click', 'div.gallery', function () {
        if ($(this).hasClass("bigimg")) {
            $(".gallery").removeClass("bigimg");

        }
        else {
            $(".gallery").removeClass("bigimg");
            $(this).animate().toggleClass("bigimg");
        }

    });

    //filter by extansions
    $('input[type=checkbox]').change(function () {
        var arrJQElem = $('input[type=checkbox]:checked');
        var jsArrDOMElem = arrJQElem.map(function (index, element) {
            return element.value
        });
        updateGallery(jsArrDOMElem);
    });

    //updateGallery
    function updateGallery(arr) {

        var imgs = images.filter(function (element) {
            return contains(arr, element);
        });
        $('.pict').empty();
        imgs.forEach(function (image) {
            switch (image.Extension) {
                case ".jpg": {
                    $(".pict").append("<div class='gallery' style='border:2px red solid'><img src=" + image.Url + "  /><a onclick=\"removeImage('" + image.Url + "')\" class='delImg'><a/><div/>");
                    break;
                }
                case ".png": {
                    $(".pict").append("<div class='gallery' style='border:2px blue solid'><img src=" + image.Url + "  /><a onclick=\"removeImage('" + image.Url + "')\" class='delImg'><a/><a/><div/>");
                    break;
                }
                default:
                    $(".pict").append("<div class='gallery' style='border:2px green solid'><img src=" + image.Url + "  /><a onclick=\"removeImage('" + image.Url + "')\" class='delImg'><a/><div/>");
                    break;
            }
        })

    };
    function contains(arr, element) {
        var result = false;
        for (var i = 0 ; i < arr.length ; i++) {
            if (arr[i] == "other" && element.Extension != ".jpg" && element.Extension != ".png") {
                result = true;
            }
            if (element.Extension == arr[i])
                result = true;
        }
        return result;

    };

    //initialize gallery
    function init() {
        $.get('http://localhost:2047/Home/JsonList',
        function (data) {
            images = data;
            images.forEach(function (image) {
                switch (image.Extension) {
                    case ".jpg": {
                        $(".pict").append("<div class='gallery' style='border:2px red solid'><img src=" + image.Url + "  /><a onclick=\"removeImage('" + image.Url + "')\" class='delImg'><a/><div/>");
                        break;
                    }
                    case ".png": {
                        $(".pict").append("<div class='gallery' style='border:2px blue solid'><img src=" + image.Url + "  /><a onclick=\"removeImage('" + image.Url + "')\" class='delImg'><a/><div/>");
                        break;
                    }
                    default:
                        $(".pict").append("<div class='gallery' style='border:2px green solid'><img src=" + image.Url + "  /><a onclick=\"removeImage('" +image.Url+ "')\" class='delImg'><a/><div/>");
                        break;
                }
            });
            $('#fio').css('color', $('#botColor').val());
        });
    }
    //footer color
    $('#botColor').change(function () {
        $('#fio').css('color', $('#botColor').val());
    });
    //add button ChangeName and Send Image
    $('#file').change(function () {
        $('#name').show();
        $('#submit').show();
    });
    //Tiptool
    $('.term').hover(
        function () { $(this).find('.tooltip').show(150) },
        function () { $(this).find('.tooltip').hide() });

//hover delete button
    $('.pict').on('mouseover', 'div.gallery', function () {
        $(this).find('a.delImg').show();
    });
    $('.pict').on('mouseleave', 'div.gallery', function () {
        $(this).find('a.delImg').hide();
    });
    
    //remove Image
    function removeImage(url) {
        var flag = confirm("Вы уверены, что хотите удалить картинку?");
        if (flag) {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:2047/Home/RemoveImage',
                data: {
                    url: url
                },
                success: null
            });
            location.reload();
        }
    };
});