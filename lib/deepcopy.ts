function deepCopy<T>(obj: T): T {
  let copy: any;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime((obj as Date).getTime());
    return copy as T;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = (obj as any[]).length; i < len; i++) {
      copy[i] = deepCopy((obj as any[])[i]);
    }
    return copy as T;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) copy[attr] = deepCopy((obj as any)[attr]);
    }
    return copy as T;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

export default deepCopy