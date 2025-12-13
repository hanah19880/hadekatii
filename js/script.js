document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const messagesList = document.getElementById("messagesList");
    const searchInput = document.getElementById("search");

    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    renderMessages();

    // إضافة رسالة
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) return;

        messages.push({ name, email, message });
        saveMessages();
        renderMessages();
        form.reset();
    });

    // البحث التلقائي (نفس فكرة users)
    searchInput.addEventListener("input", renderMessages);

    // عرض الرسائل + البحث بالاسم والإيميل فقط
    function renderMessages() {
        const filter = searchInput.value.toLowerCase();
        messagesList.innerHTML = "";

        messages.forEach((msg, index) => {
            if (
                !msg.name.toLowerCase().includes(filter) &&
                !msg.email.toLowerCase().includes(filter)
            ) return;

            const li = document.createElement("li");

            li.innerHTML = `
                <strong>الاسم:</strong> ${msg.name}<br>
                <strong>البريد:</strong> ${msg.email}<br>
                <strong>الرسالة:</strong> ${msg.message}
                <button class="delete-btn" data-index="${index}">حذف</button>
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

    // حذف رسالة
    function attachDeleteEvents() {
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.onclick = function () {
                const index = this.dataset.index;
                messages.splice(index, 1);
                saveMessages();
                renderMessages();
            };
        });
    }

    // حفظ في localStorage
    function saveMessages() {
        localStorage.setItem("messages", JSON.stringify(messages));
    }
});
