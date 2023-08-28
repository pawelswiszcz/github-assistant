(
    function () {

        /**
         * Check and set a global guard variable.
         * If this content script is injected into the same page again,
         * it will do nothing next time.
         */
        if (window.hasRun) {
            return;
        }
        window.hasRun = true;

        /**
         * Remove every beast from the page.
         */
        function resetElement(element) {
            if (element) {
                element.value = '';
                triggerChangeEvent(null);
            }
        }

        function resetElements(elements) {
            if (elements) {
                for (const elementsKey in elements) {
                    elements[elementsKey].value = '';
                }
                triggerChangeEvent(null);
            }
        }


        function commit(element) {
            document.querySelector('#partial-new-comment-form-actions button.btn-primary[type="submit"]').click();
        }

        function scrollIntoElement(element) {
            element.scrollIntoView();
        }

        function triggerChangeEvent(element) {
            if (element) {
                const event = new Event('change');
                element.dispatchEvent(event);
            }
        }

        /**
         * Listen for messages from the background script.
         */
        browser.runtime.onMessage.addListener((message) => {
            let mrAuthor = document.querySelector(".author").innerHTML;

            const metaTag = document.querySelector('meta[name="user-login"]');
            const loggedUser = metaTag.getAttribute('content');

            let prDescription = document.querySelector("#pull_request_body");
            let note = document.querySelectorAll("form.js-inline-comment-form textarea");


            if (message.command === "reset") {
                resetElement(prDescription);
                resetElements(note);
            } else if (message.command === "notes") {
                scrollIntoElement(note);
            } else if (message.command === "goToDescription") {
                scrollIntoElement(document.querySelector("#repository-container-header"));
            } else if (message.command === "commit") {
                commit();
            } else if (message.command) {
                if (message.target === "#pr-description" && prDescription) {


                    let command = message.command;

                    command = command.replace('#mrAuthor#', mrAuthor);
                    command = command.replace('#loggedUser#', loggedUser);

                    prDescription.value = prDescription.value + command + '\n';
                } else {

                    let command = message.command;

                    command = command.replace('#mrAuthor#', mrAuthor);
                    command = command.replace('#loggedUser#', loggedUser);

                    for (const noteKey in note) {
                        note[noteKey].value = note[noteKey].value + command + '\n';
                    }


                    triggerChangeEvent(note);
                }

            }
        });

    }
)();
