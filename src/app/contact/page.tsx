// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipLoader } from "react-spinners"; // Spinner for loading state
import Head from "next/head";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Me - Miro Gohacki</title>
        <meta
          name="description"
          content="Get in touch with Miro Gohacki, a Computer Science student. Fill out the contact form or reach out via email."
        />
      </Head>
      <div className="pt-32 px-4 animate-fadeInUp">
        {/* Page Title */}
        <h1 className="text-5xl text-center font-extrabold gradient-text drop-shadow-lg mb-6">
          Contact Me
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-xl mx-auto text-center mb-8">
          I’d love to hear from you! Fill out the form below or email me directly at{" "}
          <a
            href="mailto:mirogohacki@gmail.com"
            className="text-pink-500 font-semibold hover:underline"
          >
            mirogohacki@gmail.com
          </a>.
        </p>

        {/* Contact Form Container */}
        <div className="glass p-8 rounded-xl shadow-lg max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name Field */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Name</span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-900 dark:text-white transition-colors duration-300"
                placeholder="Your Name"
                aria-label="Name"
              />
            </label>

            {/* Email Field */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Email</span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-900 dark:text-white transition-colors duration-300"
                placeholder="you@example.com"
                aria-label="Email"
              />
            </label>

            {/* Subject Field */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Subject</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-900 dark:text-white transition-colors duration-300"
                placeholder="Subject"
                aria-label="Subject"
              />
            </label>

            {/* Message Field */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Message</span>
              <textarea
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-900 dark:text-white transition-colors duration-300"
                placeholder="Your message..."
                aria-label="Message"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-gradient-to-br from-purple-500 to-pink-500 text-white py-3 mt-4 rounded-lg font-semibold hover:opacity-90 transition-opacity ${
                isSubmitting ? "cursor-not-allowed opacity-50" : ""
              } flex items-center justify-center`}
            >
              {isSubmitting ? (
                <>
                  <ClipLoader size={20} color="#ffffff" className="mr-2" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {/* Success Message */}
            {submitStatus === "success" && (
              <p className="text-green-500 mt-4 text-center">
                Your message has been sent successfully!
              </p>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <p className="text-red-500 mt-4 text-center">
                {errorMessage || "Failed to send your message. Please try again later."}
              </p>
            )}
          </form>
        </div>

        {/* Social Media Links */}
        <div className="text-center mt-8">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Or connect with me on:
          </p>
          <div className="flex justify-center space-x-6">
            {/* LeetCode */}
            <a
              href="https://leetcode.com/u/miromace" // Replace with your LeetCode profile URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition-colors duration-300 text-2xl"
              aria-label="LeetCode"
            >
              {/* LeetCode Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/miro-gohacki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition-colors duration-300 text-2xl"
              aria-label="LinkedIn"
            >
              {/* LinkedIn Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 19h-3v-10h3v10zm-1.5-11.3c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.25 11.3h-3v-5.6c0-1.337-.027-3.06-1.867-3.06-1.868 0-2.155 1.46-2.155 2.96v5.7h-3v-10h2.884v1.37h.041c.402-.76 1.384-1.56 2.846-1.56 3.046 0 3.607 2.004 3.607 4.61v5.58z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/gohacki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition-colors duration-300 text-2xl"
              aria-label="GitHub"
            >
              {/* GitHub Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.3 1 .3 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.5-.3-5.1-1.3-5.1-5.7 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.5 11.5 0 013-.4c1 0 2 .1 3 .4 2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.7.8 1.2 1.9 1.2 3.2 0 4.4-2.6 5.4-5.1 5.7.4.4.8 1.2.8 2.4v3.6c0 .3.2.7.8.6C20.7 21.4 24 17.1 24 12c0-6.3-5.2-11.5-12-11.5z" />
              </svg>
            </a>
          </div>
        </div>
        </div>
      </>
    );
}
