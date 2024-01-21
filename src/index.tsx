function App(props: { markdown: string; browser: any }) {
  return (
    <div>
      <RenderMarkdown
        markdown={props.markdown}
        browser={props.browser}
      ></RenderMarkdown>
    </div>
  );
}

window.addEventListener("load", () => {
  fetch("credits.md")
    .then((response) => response.text())
    .then((text) => {
      if (!Object.hasOwn(window, "anura")) {
        // Development mode
        document.body.appendChild(
          <App
            markdown={text}
            browser={{
              openTab: (url: string) => {
                window.open(url);
              },
            }}
          />
        );
        return;
      }
      anura.import("anura.libbrowser").then((browser: any) => {
        document.body.appendChild(<App markdown={text} browser={browser} />);
      });
    });
});
