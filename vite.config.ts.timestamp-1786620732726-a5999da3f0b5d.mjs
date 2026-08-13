// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/priya/Downloads/3d-creative-portfolio-AI-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/priya/Downloads/3d-creative-portfolio-AI-main/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ["three"],
            "three-eco": [
              "@react-three/fiber",
              "@react-three/drei",
              "@react-three/postprocessing"
            ],
            rapier: ["@react-three/rapier"]
          }
        }
      }
    },
    plugins: [
      react(),
      {
        name: "api-chat-proxy",
        configureServer(server) {
          server.middlewares.use("/api/chat", (req, res) => {
            if (req.method !== "POST") {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: "Method not allowed" }));
              return;
            }
            let body = "";
            req.on("data", (chunk) => {
              body += chunk.toString();
            });
            req.on("end", async () => {
              try {
                const { messages, context } = JSON.parse(body);
                const groqKey = env.GROQ_API_KEY;
                const model = env.GROQ_MODEL || "llama-3.3-70b-versatile";
                if (!groqKey) {
                  res.setHeader("Content-Type", "application/json");
                  res.end(
                    JSON.stringify({
                      reply: "GROQ_API_KEY not set in .env \u2014 using fallback mode."
                    })
                  );
                  return;
                }
                const groqRes = await fetch(
                  "https://api.groq.com/openai/v1/chat/completions",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${groqKey}`
                    },
                    body: JSON.stringify({
                      model,
                      temperature: 0.7,
                      max_tokens: 200,
                      messages: [
                        { role: "system", content: context },
                        ...messages.slice(-6)
                      ]
                    })
                  }
                );
                if (!groqRes.ok) {
                  const errText = await groqRes.text();
                  console.error("[CHAT] Groq error:", errText);
                  res.setHeader("Content-Type", "application/json");
                  res.end(
                    JSON.stringify({
                      reply: "Groq API returned an error. Check your key and model."
                    })
                  );
                  return;
                }
                const data = await groqRes.json();
                const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ reply }));
              } catch (err) {
                console.error("[CHAT] Error:", err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: "Internal server error" }));
              }
            });
          });
        }
      }
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwcml5YVxcXFxEb3dubG9hZHNcXFxcM2QtY3JlYXRpdmUtcG9ydGZvbGlvLUFJLW1haW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHByaXlhXFxcXERvd25sb2Fkc1xcXFwzZC1jcmVhdGl2ZS1wb3J0Zm9saW8tQUktbWFpblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcHJpeWEvRG93bmxvYWRzLzNkLWNyZWF0aXZlLXBvcnRmb2xpby1BSS1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xuXG4gIHJldHVybiB7XG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICB0aHJlZTogW1widGhyZWVcIl0sXG4gICAgICAgICAgICBcInRocmVlLWVjb1wiOiBbXG4gICAgICAgICAgICAgIFwiQHJlYWN0LXRocmVlL2ZpYmVyXCIsXG4gICAgICAgICAgICAgIFwiQHJlYWN0LXRocmVlL2RyZWlcIixcbiAgICAgICAgICAgICAgXCJAcmVhY3QtdGhyZWUvcG9zdHByb2Nlc3NpbmdcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByYXBpZXI6IFtcIkByZWFjdC10aHJlZS9yYXBpZXJcIl0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAge1xuICAgICAgICBuYW1lOiBcImFwaS1jaGF0LXByb3h5XCIsXG4gICAgICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcbiAgICAgICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKFwiL2FwaS9jaGF0XCIsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcS5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG4gICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDA1O1xuICAgICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiTWV0aG9kIG5vdCBhbGxvd2VkXCIgfSkpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgYm9keSA9IFwiXCI7XG4gICAgICAgICAgICByZXEub24oXCJkYXRhXCIsIChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgIGJvZHkgKz0gY2h1bmsudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVxLm9uKFwiZW5kXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG1lc3NhZ2VzLCBjb250ZXh0IH0gPSBKU09OLnBhcnNlKGJvZHkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3FLZXkgPSBlbnYuR1JPUV9BUElfS0VZO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gZW52LkdST1FfTU9ERUwgfHwgXCJsbGFtYS0zLjMtNzBiLXZlcnNhdGlsZVwiO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFncm9xS2V5KSB7XG4gICAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgICAgICAgICAgIHJlcy5lbmQoXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICByZXBseTpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiR1JPUV9BUElfS0VZIG5vdCBzZXQgaW4gLmVudiBcdTIwMTQgdXNpbmcgZmFsbGJhY2sgbW9kZS5cIixcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvcVJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgICAgICAgICAgICAgXCJodHRwczovL2FwaS5ncm9xLmNvbS9vcGVuYWkvdjEvY2hhdC9jb21wbGV0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2dyb3FLZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiAwLjcsXG4gICAgICAgICAgICAgICAgICAgICAgbWF4X3Rva2VuczogMjAwLFxuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJvbGU6IFwic3lzdGVtXCIsIGNvbnRlbnQ6IGNvbnRleHQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1lc3NhZ2VzLnNsaWNlKC02KSxcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFncm9xUmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBlcnJUZXh0ID0gYXdhaXQgZ3JvcVJlcy50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW0NIQVRdIEdyb3EgZXJyb3I6XCIsIGVyclRleHQpO1xuICAgICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgICAgICAgICAgICByZXMuZW5kKFxuICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgcmVwbHk6XG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdyb3EgQVBJIHJldHVybmVkIGFuIGVycm9yLiBDaGVjayB5b3VyIGtleSBhbmQgbW9kZWwuXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IGF3YWl0IGdyb3FSZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcGx5ID1cbiAgICAgICAgICAgICAgICAgIGRhdGEuY2hvaWNlcz8uWzBdPy5tZXNzYWdlPy5jb250ZW50IHx8XG4gICAgICAgICAgICAgICAgICBcIlNvcnJ5LCBJIGNvdWxkbid0IHByb2Nlc3MgdGhhdC5cIjtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgcmVwbHkgfSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW0NIQVRdIEVycm9yOlwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThWLFNBQVMsY0FBYyxlQUFlO0FBQ3BZLE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFFM0MsU0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sY0FBYztBQUFBLFlBQ1osT0FBTyxDQUFDLE9BQU87QUFBQSxZQUNmLGFBQWE7QUFBQSxjQUNYO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsWUFDQSxRQUFRLENBQUMscUJBQXFCO0FBQUEsVUFDaEM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixnQkFBZ0IsUUFBUTtBQUN0QixpQkFBTyxZQUFZLElBQUksYUFBYSxDQUFDLEtBQUssUUFBUTtBQUNoRCxnQkFBSSxJQUFJLFdBQVcsUUFBUTtBQUN6QixrQkFBSSxhQUFhO0FBQ2pCLGtCQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsT0FBTyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3ZEO0FBQUEsWUFDRjtBQUNBLGdCQUFJLE9BQU87QUFDWCxnQkFBSSxHQUFHLFFBQVEsQ0FBQyxVQUFrQjtBQUNoQyxzQkFBUSxNQUFNLFNBQVM7QUFBQSxZQUN6QixDQUFDO0FBQ0QsZ0JBQUksR0FBRyxPQUFPLFlBQVk7QUFDeEIsa0JBQUk7QUFDRixzQkFBTSxFQUFFLFVBQVUsUUFBUSxJQUFJLEtBQUssTUFBTSxJQUFJO0FBQzdDLHNCQUFNLFVBQVUsSUFBSTtBQUNwQixzQkFBTSxRQUFRLElBQUksY0FBYztBQUVoQyxvQkFBSSxDQUFDLFNBQVM7QUFDWixzQkFBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsc0JBQUk7QUFBQSxvQkFDRixLQUFLLFVBQVU7QUFBQSxzQkFDYixPQUNFO0FBQUEsb0JBQ0osQ0FBQztBQUFBLGtCQUNIO0FBQ0E7QUFBQSxnQkFDRjtBQUVBLHNCQUFNLFVBQVUsTUFBTTtBQUFBLGtCQUNwQjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsUUFBUTtBQUFBLG9CQUNSLFNBQVM7QUFBQSxzQkFDUCxnQkFBZ0I7QUFBQSxzQkFDaEIsZUFBZSxVQUFVLE9BQU87QUFBQSxvQkFDbEM7QUFBQSxvQkFDQSxNQUFNLEtBQUssVUFBVTtBQUFBLHNCQUNuQjtBQUFBLHNCQUNBLGFBQWE7QUFBQSxzQkFDYixZQUFZO0FBQUEsc0JBQ1osVUFBVTtBQUFBLHdCQUNSLEVBQUUsTUFBTSxVQUFVLFNBQVMsUUFBUTtBQUFBLHdCQUNuQyxHQUFHLFNBQVMsTUFBTSxFQUFFO0FBQUEsc0JBQ3RCO0FBQUEsb0JBQ0YsQ0FBQztBQUFBLGtCQUNIO0FBQUEsZ0JBQ0Y7QUFFQSxvQkFBSSxDQUFDLFFBQVEsSUFBSTtBQUNmLHdCQUFNLFVBQVUsTUFBTSxRQUFRLEtBQUs7QUFDbkMsMEJBQVEsTUFBTSxzQkFBc0IsT0FBTztBQUMzQyxzQkFBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsc0JBQUk7QUFBQSxvQkFDRixLQUFLLFVBQVU7QUFBQSxzQkFDYixPQUNFO0FBQUEsb0JBQ0osQ0FBQztBQUFBLGtCQUNIO0FBQ0E7QUFBQSxnQkFDRjtBQUVBLHNCQUFNLE9BQVksTUFBTSxRQUFRLEtBQUs7QUFDckMsc0JBQU0sUUFDSixLQUFLLFVBQVUsQ0FBQyxHQUFHLFNBQVMsV0FDNUI7QUFDRixvQkFBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsb0JBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUFBLGNBQ25DLFNBQVMsS0FBSztBQUNaLHdCQUFRLE1BQU0saUJBQWlCLEdBQUc7QUFDbEMsb0JBQUksYUFBYTtBQUNqQixvQkFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8sd0JBQXdCLENBQUMsQ0FBQztBQUFBLGNBQzVEO0FBQUEsWUFDRixDQUFDO0FBQUEsVUFDSCxDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
