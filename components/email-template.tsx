interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
}

const EmailTemplate: React.FC<Readonly<Props>> = ({
  firstName,
  lastName,
  email,
  phone,
  message,
}) => {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <div
        style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}
      >
        New Message Received
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Name:</strong> {firstName} {lastName}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        {phone && (
          <p>
            <strong>Phone:</strong> {phone}
          </p>
        )}
        <p>
          <strong>Message:</strong>
        </p>
        <p>{message}</p>
      </div>
      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "12px",
          color: "#888",
        }}
      >
        &copy; 2025 Your Company. All rights reserved.
      </div>
    </div>
  );
};

export { EmailTemplate };
