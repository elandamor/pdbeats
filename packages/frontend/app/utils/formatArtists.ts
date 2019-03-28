export default function(artists: any, onlyAlias = false) {
  return onlyAlias
  ? artists.split(',').map((artist: any) => artist.toLowerCase().trim().replace(/\s/g, '-'))
  : artists.split(',').map((artist: any) => (
    {
      alias: artist.toLowerCase().trim().replace(/\s/g, '-'),
      name: artist.trim(),
    }
  ));
};
