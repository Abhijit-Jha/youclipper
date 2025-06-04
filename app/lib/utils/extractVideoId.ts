export const extractVideoId = (input: string): string  => {
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = input.match(regex);
    return match ? match[1] : "";
  };