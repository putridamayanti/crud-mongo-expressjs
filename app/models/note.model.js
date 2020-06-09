module.exports = mongoose => {
    const Note = mongoose.model(
        'note',
        mongoose.Schema(
            {
                title: String,
                content: String,
            },
            { timestamps: true }
        )
    );

    return Note;
};
