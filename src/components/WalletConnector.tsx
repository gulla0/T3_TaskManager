import { useState } from "react";
import { BrowserWallet } from "@meshsdk/core";

interface WalletConnectorProps {
  onAddressRetrieved: (address: string) => void; // Callback to pass the wallet address
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onAddressRetrieved }) => {
  const [availableWallets, setAvailableWallets] = useState<{ name: string; icon: string; version: string }[]>([]);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Add error message state

  const fetchWallets = async () => {
    const wallets = await BrowserWallet.getAvailableWallets();
    setAvailableWallets(wallets);
  };

  const connectWallet = async (walletName: string) => {
    try {
      console.log("Attempting to enable wallet:", walletName); // Debugging log
  
      const wallet = await BrowserWallet.enable(walletName);
  
      const address = await wallet.getChangeAddress(); // Fetch wallet address
      setConnectedWallet(walletName); // Save connected wallet name
      onAddressRetrieved(address); // Pass address to parent
    } catch (error: any) {
      if (process.env.NODE_ENV === "development" && error.message.includes("[BrowserWallet]")) {
        // Suppress console.error for specific errors in development
        console.warn("Handled BrowserWallet error:", error);
      } else {
        console.error("Caught error in connectWallet:", error); // Log only unexpected errors
      }
  
      // Display a user-friendly error message
      setErrorMessage("Please make sure your wallet is enabled.");
    }
  };             

  const disconnectWallet = () => {
    setConnectedWallet(null);
    onAddressRetrieved(""); // Reset walletAddress in parent
  };

  const closeError = () => {
    setErrorMessage(null); // Clear the error message
  };

  return (
    <div>
      {errorMessage ? ( // Show error message if it exists
          <div
          style={{
            backgroundColor: "#FFD2D2", // Light mellow red background
            color: "#D8000C", // Mellow red text
            padding: "16px",
            borderRadius: "8px",
            position: "relative", // For positioning the close button
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for aesthetics
            marginBottom: "16px", // Add spacing below the box
          }}
        >
          <button
            onClick={closeError}
            style={{
              position: "absolute",
              top: "-8px", // Slightly above the box for elegance
              right: "-8px", // Aligns with the corner
              backgroundColor: "#696969", // Black circular background
              color: "white", // White "X" text
              borderRadius: "50%", // Circular button
              width: "24px", // Fixed width for the button
              height: "24px", // Fixed height for the button
              display: "flex", // Center the "X"
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              cursor: "pointer",
              fontSize: "10px", // Slightly smaller font for subtlety
              border: "2px solid #d3d3d3", // Gray border for button
            }}
          >
            X
          </button>
          <p style={{ margin: 0 }}>Please make sure your wallet is enabled.</p>
        </div>                     
      ) : connectedWallet ? ( // Show connected wallet state
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <p style={{ color: "#696969", margin: 0 }}>Connected to {connectedWallet}</p>
          <button 
            style={{ color: "#d3d3d3" }} 
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <button style={{ color: "#d3d3d3" }} onClick={fetchWallets}>Show Wallets</button>
          <ul>
            {availableWallets.map((wallet) => (
              <li key={wallet.name}>
                <button
                  style={{ color: "#d3d3d3" }} // Light gray color
                  onClick={() =>
                    connectWallet(wallet.name).catch((error) => {
                      console.error("Unhandled error caught in onClick:", error);
                    })
                  }                  
                >
                  <img src={wallet.icon} alt={`${wallet.name} icon`} width="20" height="20" />
                  {wallet.name} (v{wallet.version})
              </button>

              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WalletConnector;
