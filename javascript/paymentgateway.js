 <!-- Strip payment gateway -->
      <script src="https://js.stripe.com/v3/"></script>


      <script type="module">
        import { backendUrl, getQueryVariable, setCookie, parseJwt, getCookie, getCart } from "./utils/index.js";

        document.addEventListener("DOMContentLoaded", () => {
          document.getElementById("social-login-google").href = `${backendUrl}/auth/google`;
          document.getElementById("social-login-facebook").href = `${backendUrl}/auth/facebook`;

          const token = getQueryVariable("token");
          const emailCookie = getCookie("email");
          const nameCookie = getCookie("name");
          const socialLoginHeader = document.getElementById("social-login-header");
          const socialLoginGoogle = document.getElementById("social-login-google");
          const socialLoginFacebook = document.getElementById("social-login-facebook");
          const socialLoginForm = document.getElementById("social-login-form");
          const profileBox = document.getElementById('profile-box');
          const nameAuth = document.getElementById('name-auth');
          const emailAuth = document.getElementById('email-auth');
          const cart = getCart();
          const cartItem = document.getElementById('cart-item');
          cartItem.innerText = cart?.length;

          if (token) {
            setCookie("session", token);
            const jwtPayload = parseJwt(token);
            console.log(jwtPayload);

            if (jwtPayload) {
              setCookie("userId", jwtPayload._id);
              setCookie("email", jwtPayload.email);
              setCookie("name", jwtPayload.name);
            }

            if (window.history.pushState) {
              const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
              window.history.replaceState({ path: newUrl }, '', newUrl);

              window.location.reload();
            }
          }

          if (emailCookie) {
            socialLoginHeader.innerHTML = `Welcome back, ${nameCookie} ${emailCookie}! <span id="logout" style="color: red; cursor: pointer; margin-left: 10px;">(Logout)</span>`;

            profileBox.style.display = 'flex';
            nameAuth.innerHTML = nameCookie;
            emailAuth.innerHTML = emailCookie;
            [socialLoginGoogle, socialLoginFacebook, socialLoginForm].forEach(element => {
              if (element) {
                element.style.display = "none";
              }
            });
          }

          document.getElementById('cart').addEventListener('click', async () => {
            window.open('/shoppingcart.html', "_self");
          })

          document.getElementById("logout-text").addEventListener("click", async () => {
            try {
              const response = await fetch(`${backendUrl}/logout`, { method: "GET", credentials: "include" });
              if (!response.ok) throw new Error("Logout failed");

              ["session", "email", "userId", "name"].forEach(cookieName => setCookie(cookieName, "", -1));

              window.location.reload();
            } catch (error) {
              alert(`Error: ${error.message}`);
            }
          });
        });

        document.getElementById("logout").addEventListener("click", async () => {
          try {
            const response = await fetch(`${backendUrl}/logout`, { method: "GET", credentials: "include" });
            if (!response.ok) throw new Error("Logout failed");

            ["session", "email", "userId", "name"].forEach(cookieName => setCookie(cookieName, "", -1));

            window.location.reload();
          } catch (error) {
            alert(`Error: ${error.message}`);
          }
        });

        document.getElementById("loginForm").addEventListener("submit", async function (event) {
          event.preventDefault();
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          try {
            const response = await fetch(`${backendUrl}/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Login failed. Please check your credentials.");

            setCookie("session", data.token);
            const jwtPayload = parseJwt(data.token);
            if (jwtPayload) {
              setCookie("user_id", jwtPayload.sub);
              setCookie("email", jwtPayload.email);
            }

            alert("Login successful.");
            window.location.href = "/pine.html";
          } catch (error) {
            alert(`Error: ${error.message}`);
          }
        });
      </script>

