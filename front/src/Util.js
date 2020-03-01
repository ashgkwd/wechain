const createOnChange = setter => e => setter(e.target.value);

const handleFetch = res => (res.ok ? res.json() : res.text().then(handleError));

function handleError(text) {
  console.log("handle Error", text);
  let error = text;

  // NOTE: This function gets matter from HTML response
  // of error. Based on observations, it's <pre> element
  // of the HTML document which is at index 5.

  try {
    if (`${text}`.indexOf("TYPE html>") > -1) {
      let d = document.createElement("div");
      d.innerHTML = text;
      error = d.childNodes[5].textContent;
    }
  } catch (err) {
    console.warn("failed to read error", err);
    return Promise.reject(error);
  }

  return Promise.reject(error);
}

export { createOnChange, handleError, handleFetch };
