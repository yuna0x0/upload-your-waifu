var dirTree;
$.getJSON("dirTree.json", function (data) {
    dirTree = data;
});

$("#submit").click(function () {
    $("#errorStatus").empty();
    $("#photoGallery").empty();
    var searchID = $("#searchID").val();
    for (var i = 0; i < dirTree.children.length; i++) {
        if (dirTree.children[i].name == searchID) {
            if (dirTree.children[i].children.length) {
                for (var j = 0; j < dirTree.children[i].children.length; j++) {
                    console.log(dirTree.children[i].children[j].path);
                }
            }
            else {
                $("#errorStatus").text("No pictures found in this ID's Directory! <br> <a href='' style='color: #03a9f4'>Learn and Contribute your waifu's pictures (*'ω'*)</a>");
            }
        }
        else {
            $("#errorStatus").html("Directory with this ID is not found! <br> <a href='' style='color: #03a9f4'>Learn and Contribute your waifu's pictures (*'ω'*)</a>");
        }
    }
});