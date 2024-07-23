class HashMap {
    constructor(buckets = 16, loadFactor = 0.85) {
        this.buckets = buckets;
        this.arrBuckets = Array(this.buckets)
            .fill(null)
            .map(() => []);
        this.capacity = 0;
        this.loadFactor = loadFactor;
    }

    // hash code function - creates the code for converting key to bucket
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return Math.abs(hashCode % this.buckets);
    }

    checkIndex(index) {
        if (index < 0 || index >= this.arrBuckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.arrBuckets[index];

        // updates the bucket's value if the key already exists
        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, existingValue] = bucket[i];

            if (existingKey === key) {
                bucket[i] = [key, value];
                return;
            }
        }

        // adds the key and value to the bucket and adds one to the size of the array
        bucket.push([key, value]);
        this.capacity++;

        // resize the capacity if there's a chance for collision (greater than load factor)
        if (this.size / this.buckets > this.loadFactor) {
            this.resize();
        }
    }

    // method used to resize the number of buckets
    resize() {

        // gets the old buckets and assign them to the current variable
        const currBuckets = this.arrBuckets;

        // double the size of the buckets
        this.buckets *= 2;

        // create new array with the new amount of size
        this.arrBuckets = Array(this.buckets)
            .fill(null)
            .map(() => []);
        this.capacity = 0;

        // adds the existing buckets from the previous array and adds them to the new one
        for (const bucket of currBuckets) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.arrBuckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, existingValue] = bucket[i];
            if (existingKey === key) {
                return existingValue;
            }
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.arrBuckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, _ ] = bucket[i];
            if (existingKey === key ) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
          const [existingKey, existingValue] = bucket[i];
          if (existingKey === key) {
            bucket.splice(i, 1);
            this.size--;
            return true;
          }
        }

        return false;
    }

    length() {
        return this.capacity;
    }

    clear() {
        this.arrBuckets = Array(this.buckets)
            .fill(null)
            .map(() => []);
        this.capacity = 0;
    }

    keys() {
        const keysArray = [];
        for (const bucket of this.buckets) {
          for (const [key, value] of bucket) {
            keysArray.push(key);
          }
        }
        return keysArray;
    }

    values() {
        const valuesArray = [];
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                valuesArray.push(value);
            }
        }

    return valuesArray;
    }

    etnries() {
        const entriesArray = [];
        for (const bucket of this.buckets) {
          for (const [key, value] of bucket) {
            entriesArray.push([key, value]);
          }
        }
        return entriesArray;
    }
}

export { HashMap };