$(document).ready(function() {
    // Select all elements with the class .deleteBtn
    let deleteButtons = $('.deleteBtn');
  
    // Attach click event handler to each .deleteBtn element
    deleteButtons.on("click", function(e) {
      e.stopPropagation();
      const projectId = $(this).data("project-id");
  
      // Perform the AJAX request for deleting the project
      $.ajax({
        url: "/user/remove/removeproject/" + projectId, // Replace with your delete project endpoint URL
        method: "DELETE",
        success: function(data) {
          // Handle the success response, if needed
          window.location.reload();

        },
        error: function(err) {
          console.log("Error:", err);
        }
        
    });
    return false; // Prevent the anchor tag from being triggered\
    });
  });
  