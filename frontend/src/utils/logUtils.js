  export const getLevelColor = (level) => {
    switch (level) {
      case "ERROR":
        return "red";
      case "WARN":
        return "orange";
      case "INFO":
        return "green";
      default:
        return "gray";
    }
  };