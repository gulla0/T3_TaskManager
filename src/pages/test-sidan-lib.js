export default function TestSidanLib() {
    async () => {
        try {
          const SidanLib = await import("@sidan-lab/sidan-csl-rs-browser");
          console.log("Library loaded successfully!", SidanLib);
      
          // Inspect the available functions or properties
        } catch (error) {
          console.error("Error loading the library:", error);
        }
      };
}