const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const liveButtons = document.querySelectorAll("[data-live-action]");
const signupForm = document.getElementById("signup-form");
const signupStatus = document.getElementById("signup-status");
const authTabs = document.querySelectorAll("[data-auth-mode]");
const config = window.OWNCLASSES_CONFIG || {};

const applySiteConfig = () => {
  document.querySelectorAll("[data-brand-name]").forEach((element) => {
    if (config.brandName) {
      element.textContent = config.brandName;
    }
  });

  const tagline = document.querySelector("[data-brand-tagline]");
  if (tagline && config.tagline) {
    tagline.textContent = config.tagline;
  }

  const founderName = document.querySelector("[data-founder-name]");
  if (founderName && config.founderName) {
    founderName.textContent = config.founderName;
  }

  const email = document.querySelector("[data-contact-email]");
  if (email && config.contactEmail) {
    email.textContent = config.contactEmail;
    email.href = `mailto:${config.contactEmail}`;
  }

  const phone = document.querySelector("[data-contact-phone]");
  if (phone && config.contactPhone) {
    phone.textContent = config.contactPhone;
    phone.href = `tel:${config.contactPhone.replace(/\s+/g, "")}`;
  }

  const logoImage = document.querySelector("[data-logo-image]");
  const logoFallback = document.querySelector(".brand-logo-fallback");
  if (logoImage && config.logoUrl) {
    logoImage.src = config.logoUrl;
    logoImage.hidden = false;
    if (logoFallback) {
      logoFallback.hidden = true;
    }
  }

  const founderImage = document.querySelector("[data-founder-image]");
  const founderCopy = document.querySelector(".founder-copy");
  if (founderImage && config.founderImageUrl) {
    founderImage.src = config.founderImageUrl;
    founderImage.hidden = false;
    if (founderCopy) {
      founderCopy.hidden = true;
    }
  }

  const heroImage = document.querySelector("[data-hero-image]");
  if (heroImage && config.heroImageUrl) {
    heroImage.src = config.heroImageUrl;
  }
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("is-locked", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-locked");
    });
  });
}

liveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.liveAction;
    const joinUrl = config.liveClass?.joinUrl;
    const notesUrl = config.liveClass?.notesUrl;

    if (action === "join" && joinUrl) {
      window.open(joinUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (action === "notes" && notesUrl) {
      window.open(notesUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const messages = {
      join: "Connect this button to your Zoom, Google Meet, or custom live class route from the backend.",
      notes: "Connect this button to notes, class recordings, or study material in the student dashboard."
    };

    window.alert(messages[action] || "This action is ready to connect to your backend.");
  });
});

if (signupForm) {
  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const mode = tab.dataset.authMode;
      const submitButton = signupForm.querySelector("button[type='submit']");

      signupForm.dataset.mode = mode;
      authTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
      signupForm.querySelectorAll(".signup-only").forEach((field) => {
        field.hidden = mode === "login";
      });

      if (submitButton) {
        submitButton.textContent = mode === "login" ? "Login" : "Create Account";
      }

      if (signupStatus) {
        signupStatus.textContent = "";
      }
    });
  });

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!signupStatus) {
      return;
    }

    const mode = signupForm.dataset.mode || "signup";
    signupStatus.textContent = mode === "login" ? "Logging in..." : "Creating account...";

    const formData = new FormData(signupForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      signupStatus.textContent = mode === "login"
        ? "Login successful. Connect your dashboard route next."
        : "Account created successfully. Connect your dashboard next.";
      signupForm.reset();
    } catch (error) {
      signupStatus.textContent = error.message || "Could not connect to backend.";
    }
  });
}

applySiteConfig();
