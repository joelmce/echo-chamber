function startViewTransition(callback) {
  // Without View Transitions:
  if (!document.startViewTransition) {
    callback();
    return;
  }

  // With View Transitions:
  const transition = document.startViewTransition(() => callback());
}

export { startViewTransition };
