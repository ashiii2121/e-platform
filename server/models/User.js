const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    class: {
        type: String,
        enum: ['class10', 'plus1', 'plus2'],
        default: 'plus2'
    },
    school: {
        type: String,
        trim: true
    },
    district: {
        type: String,
        trim: true
    },
    isTrialActive: {
        type: Boolean,
        default: true,
    },
    trialEnds: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student'
    },
    profile: {
        avatar: String,
        bio: String,
        subjects: [String],
        targetYear: String
    },
    preferences: {
        notifications: {
            type: Boolean,
            default: true
        },
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        },
        language: {
            type: String,
            enum: ['english', 'malayalam'],
            default: 'english'
        }
    },
    activity: {
        lastLogin: Date,
        loginCount: {
            type: Number,
            default: 0
        },
        downloadedPapers: [{
            paperId: String,
            downloadedAt: {
                type: Date,
                default: Date.now
            }
        }],
        favoriteSubjects: [String],
        studyStreak: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;