function contentHandler(content, platform) {
  if (platform === 'kuwo') {
    return content.replace(/&nbsp;/g, ' ').replace(/&apos;/g, "'");
  }
  return content;
}

export default contentHandler;