export const getBucketRange = (bucket) => {
  if (!bucket) return null;

  let start;
  let end;

  // Hour bucket
  if (bucket.includes(":")) {
    start = new Date(bucket);
    end = new Date(start.getTime() + 60 * 60 * 1000);
  }

  // Day bucket
  else if (bucket.length === 10) {
    start = new Date(`${bucket}T00:00:00`);
    end = new Date(start);
    end.setDate(end.getDate() + 1);
  }

  // Week bucket
  else if (bucket.length === 7) {
    start = new Date(`${bucket}-01T00:00:00`);
    end = new Date(start);
    end.setDate(end.getDate() + 7);
  }

  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
};