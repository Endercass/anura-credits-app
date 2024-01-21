function cleanUrl(href: string) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}

const renderer = {
  link(href: string, title: string | null | undefined, text: string): string {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = '<button class="fake-link" data-browser-open="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</button>";
    return out;
  },
};

marked.use({ renderer });

function RenderMarkdown({
  markdown,
  browser,
}: {
  markdown: string;
  browser: any;
}) {
  const div = document.createElement("div");
  div.innerHTML = marked.marked(markdown);
  div.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.dataset.browserOpen) {
      e.preventDefault();
      browser.openTab(target.dataset.browserOpen);
    }
  });
  return div;
}
