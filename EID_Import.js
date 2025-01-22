const contentTextarea = document.getElementById('content-textarea');
const pasteButton = document.getElementById('paste-btn');
const clearButton = document.getElementById('clear-btn');
const warningMessage = document.getElementById('row-warning');
		
//----------------------------------Module Check Boxes

 // Get selected environments
  function getSelectedEnvironments() {
    const environments = [];
    if (document.getElementById("test-checkbox").checked) environments.push('Test');
    if (document.getElementById("stage-checkbox").checked) environments.push('Stage');
    if (document.getElementById("prod-checkbox").checked) environments.push('Prod');
    return environments;
  }

//----------------------------------Module Check Boxes

		
		
		//----------------------------------Module text area
		
		
			//----------------------------------Buttons
			
				// Function to paste in text area
				pasteButton.addEventListener('click', function() {
				navigator.clipboard.readText()
					.then(text => {
						contentTextarea.value = text; // Paste the copied content
					})
					.catch(err => {
						console.error('Error pasting content: ', err);
						logMessage("Error pasting content: "+ err, false);
					});
				});
		
				// Function to clear the textarea content
				clearButton.addEventListener('click', function() {
					contentTextarea.value = ''; // Clear the textarea
					warningMessage.style.display = 'none'; // Hide the warning when cleared
				});
			
			
				 // Trigger the API call
				document.getElementById("api-call-btn").addEventListener("click", function() {
					const statusMessage = document.getElementById("status-message");
					const content = document.getElementById("content-textarea").value;
					const selectedEnvironments = getSelectedEnvironments();

					if (selectedEnvironments.length === 0) {
						alert("Please select at least one environment.");
						logMessage("Please select at least one environment. ", false);
						return;
					}

					// Clear previous status message and logs
					statusMessage.style.display = "none";
					statusMessage.textContent = '';
					logMessage("Making API call...", true);

					selectedEnvironments.forEach(env => {
						makeApiCall(env, content);
					});
				});
				
			//----------------------------------Buttons
		//----------------------------------Module text area
				
				
				
			//----------------------------------Text Area
			
				// Handle content input event to track rows
				contentTextarea.addEventListener('input', function() {
					const rowCount = contentTextarea.value.split('\n').length;
					if (rowCount > 100) {
						warningMessage.style.display = 'block'; // Show warning if more than 100 rows
						logMessage("Max 100 rows allowed...", false);
					} else {
						warningMessage.style.display = 'none'; // Hide warning if row count is <= 100
					}
				});
		
		
				// Keyboard event to prevent user typing and allow only paste (Ctrl+V)
				document.addEventListener('keydown', function(event) {
					// Ctrl + V (Paste)
					if (event.ctrlKey && event.key === 'v') {
						navigator.clipboard.readText()
							.then(text => {
								contentTextarea.value = text; // Paste the copied content
							})
							.catch(err => {
								console.error('Error pasting content: ', err);
								logMessage("Error pasting content: "+err, false);
							});
						event.preventDefault(); // Prevent default paste behavior
					}

					// Ctrl + A (Select All)
					if (event.ctrlKey && event.key === 'a') {
						contentTextarea.select(); // Select all text
						event.preventDefault(); // Prevent default select-all behavior
					}

					// Delete (Clear the content)
					if (event.key === 'Delete') {
						contentTextarea.value = ''; // Clear the textarea
						event.preventDefault(); // Prevent default delete behavior
					}
				});
			//----------------------------------Text Area
			
			
			
		
        // Function to log messages
        function logMessage(message, isSuccess = true) {
            const logContent = document.getElementById("log-content");
            const logLine = document.createElement("div");
            logLine.textContent = message;
            logLine.style.color = isSuccess ? 'green' : 'red';
            logContent.appendChild(logLine);
            logContent.scrollTop = logContent.scrollHeight; // Scroll to the bottom
        }
		
	

        // Make the API call to the selected environment
        function makeApiCall(environment, content) {
            fetch(`/api/riayati/Install/ImportEID?env=${environment}`, {
                method: "POST",
                headers: { 'Content-Type': 'text/plain' },
                body: content,
            })
            .then(response => response.text())
            .then(data => {
                logMessage(`API call to ${environment} successful: ${data}`, true);
            })
            .catch(error => {
                logMessage(`API call to ${environment} failed: ${error.message}`, false);
            });
        }

        // Send log via email
        // document.getElementById("send-log-btn").addEventListener("click", function() {
         // const email = document.getElementById("email").value;
           //  const logs = document.getElementById("log-content").innerText;

			// if (!email) {
         // //        alert("Please enter a valid email address.");
               //  return;
          //   }

            // Prepare email parameters
           //  const emailParams = {
              //   to_email: email,
           //      message: logs,
                // subject: "Log File from Developer Portal"
            // };

            // Send the email using EmailJS
            // emailjs.send('your_service_id', 'your_template_id', emailParams)
               //  .then(response => logMessage("Log sent to email successfully!", true))
                // .catch(error => logMessage("Failed to send log email: " + error.text, false));
        // });-->
