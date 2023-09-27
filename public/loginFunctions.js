async function logIn(url = "", data = {}) {
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

  let submit = document.getElementById("submit")
  submit.addEventListener("click", async ()=>{
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log("Submitting data", email, password)
    if(!email || !password){
      alert("Please add all informations!")
    }
    else{
    let resp = await logIn("/login", {email, password})
    if(resp.success) {
      alert("User logged in!")
      localStorage.setItem("User", JSON.stringify(resp.User))
      document.getElementById("email").value = ""
      document.getElementById("password").value = ""
      window.location.href = "/index"
    }
    else{
      alert(resp.message)
    }
  }

  })

  let create = document.getElementById("createAccount")
  create.addEventListener("click", async ()=>{
  window.location.href = "/signup"
  })