const chars: Array<string> ='abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ0123456789'.split('');

export function UniqueID(length: number) {
  return function(): any {

    return function(): string {
      var id = '';
      for (var i = 0; i < length; i++) {
        id += chars[~~(Math.random() * chars.length)];
      }
      return id;
    };

  };
}
