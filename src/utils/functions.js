export const getYears = (start, end) => {
    let years = [];

    for (let i = start; i <= end; i++){
        years.push(i)
    }

    return years;
}

export const formatErrors = (str) => {
    let chars = ['-', '_', '!', '*', '{', '}', ':', '"', '[', ']', '\\'];
    let escapedChars = chars.map(char => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    let regex = new RegExp(escapedChars.join('|'), 'g');
    return str.replace(regex, '');
}

export const getConditionLabel = (code) => {
    const conditions = [
        { code: '1', label: 'Excellent' },
        { code: '4', label: 'Usable' },
        { code: '7', label: 'Repairable' },
        { code: 'X', label: 'Salvage' },
        { code: 'S', label: 'Scrap' }
    ];

    const condition = conditions.find(cnd => cnd.code === String(code));
    return condition ? condition.label : code; // Return original code if not found
}

export const statusColor = (stat) => {
    switch(stat) {
        case 'pending...':
            return 'text-orange-500';
        case 'processing...':
            return 'text-brand';
        case 'completed...':
            return 'text-green-500';
        case 'declined...':
            return 'text-red-500';
        default:
            return 'text-red-500';
    }
}

export const compareJsonAndGetDifferences = (obj1, obj2) => {
    const differences = {};
    obj1 = JSON.parse(obj1);
    obj2 = JSON.parse(obj2);
    
    // Get all keys from both objects
    const allKeys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
    
    // Find common keys
    const commonKeys = allKeys.filter(key => 
        obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)
    );
    
    // Compare common keys
    commonKeys.forEach(key => {
        // Handle nested objects recursively
        if (typeof obj1[key] === 'object' && obj1[key] !== null && 
            typeof obj2[key] === 'object' && obj2[key] !== null) {
            
            const nestedDiff = compareJsonAndGetDifferences(obj1[key], obj2[key]);
            if (Object.keys(nestedDiff).length > 0) {
                differences[key] = {
                    old: obj1[key],
                    new: obj2[key]
                };
            }
        } 
        // Compare primitive values
        else if (obj1[key] !== obj2[key]) {
            differences[key] = {
                old: obj1[key],
                new: obj2[key]
            };
        }
    });
    
    return differences;
}


export const formatDateAndTime = (dt) => {

    const date = new Date(dt);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${monthNames[month]} ${day}, ${year} ${hour}:${minutes}:${seconds}`;
}

export const shouldRenderField = (field, formData) => {
    // If no dependency, always render
    if (field.depends_on === 'none') return true;
  
    const dependentKey = field.depends_on;
  
    // If the dependent field hasn't been filled yet
    if (!(dependentKey in formData)) return false;
  
    // Check if value matches the logic condition
    return formData[dependentKey] === field.logic;
}

export const capitalizeFirstWord = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const replaceCharsWithSpace = (str, charsArray) => {
    // If string is empty or charsArray is empty, return original string
    if (!str || !charsArray || charsArray.length === 0) {
        return str;
    }
    
    // Create a regular expression from the array of characters
    // Escape special regex characters to avoid errors
    const escapedChars = charsArray.map(char => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`[${escapedChars.join('')}]`, 'g');
    
    // Replace matching characters with space
    return str.replace(regex, ' ');
}

export const removeDuplicateSentences = (text) => {
    // Split by periods, question marks, exclamation marks
    let sentences = text.split(/(?<=[.!?])\s+/);
    
    // Remove duplicates while preserving order
    let uniqueSentences = [...new Set(sentences)];
    
    return uniqueSentences.join(' ');
}