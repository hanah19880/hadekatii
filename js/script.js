document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const messagesList = document.getElementById("messagesList");

    // تحميل الرسائل من التخزين أول ما تفتح الصفحة
    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    renderMessages();

    // عند الإرسال
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("رجاءً املئي جميع الحقول.");
            return;
        }

        // إضافة الرسالة للمصفوفة
        messages.push({ name, email, message });

        // حفظها في التخزين
        saveMessages();

        // إعادة عرضها
        renderMessages();

        form.reset();
    });

    // عرض الرسائل
    function renderMessages() {
        messagesList.innerHTML = "";

        messages.forEach((msg, index) => {
            let li = document.createElement("li");

            li.innerHTML = `
                <strong>الاسم:</strong> ${msg.name}<br>
                <strong>البريد:</strong> ${msg.email}<br>
                <strong>الرسالة:</strong> ${msg.message}
                <button data-index="${index}" class="delete-btn">حذف</button>
            `;

            li.style.listStyle = "none";
            li.style.margin = "10px 0";
            li.style.padding = "10px";
            li.style.background = "#e8f5e9";
            li.style.borderRadius = "8px";
            li.style.textAlign = "right";

            messagesList.appendChild(li);
        });

        attachDeleteEvents();
    }

    // ربط أزرار الحذف
    function attachDeleteEvents() {
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.onclick = function () {
                let i = this.getAttribute("data-index");

                messages.splice(i, 1); // حذف الرسالة
                saveMessages();
                renderMessages();
            };
        });
    }

    // حفظ الرسائل في localStorage
    function saveMessages() {
        localStorage.setItem("messages", JSON.stringify(messages));
    }
});
