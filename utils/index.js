export const backendUrl =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://honey-backend.onrender.com";

// ดึง Token จาก URL
export function getQueryVariable(variable) {
  const params = new URLSearchParams(window.location.search);
  return params.get(variable);
}

// บันทึกค่าใน Cookie
export function setCookie(name, value, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; secure`;
}

// ดึงค่า Cookie ตามชื่อ
export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

// แปลง JWT Token เป็น JSON
export function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1]; // ส่วน Payload ของ JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}

// ✅ ดึงข้อมูลตะกร้าสินค้าจาก localStorage
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

<!-- google translation -->
<script>
    function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,th,zh-CN,ja,fr,de,es,gk,it,pt', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
        'google_translate_element'
      );
    }
  </script>

   </footer>"
   
      <!--Start of Tawk.to Script-->

      <script type="text/javascript">
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();

        (function () {

          var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];

          s1.async = true;

          s1.src = 'https://embed.tawk.to/5eb0fd1da1bad90e54a1bc86/default';

          s1.charset = 'UTF-8';

          s1.setAttribute('crossorigin', '*');

          s0.parentNode.insertBefore(s1, s0);

        })();

      </script>

      <!--End of Tawk.to Script-->