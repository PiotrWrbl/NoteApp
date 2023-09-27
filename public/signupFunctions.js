async function signUp(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    let returnData = await response.json()
    return returnData 
  }

  const user = JSON.parse(localStorage.getItem('User'))

  let submit = document.getElementById("submit")
  submit.addEventListener("click", async ()=>{
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    if(!email || !password){
      alert("Please add all informations!")
    }
    else{
    console.log("Submitting data", email, password)
    let resp = await signUp("/signup", {email, password})
    if(resp.success) {
      alert("User created, you can log in.")
      document.getElementById("email").value = ""
      document.getElementById("password").value = ""
      window.location.href = "/"
    }
    else{
      alert("Email in use!")
    }
  }
  })