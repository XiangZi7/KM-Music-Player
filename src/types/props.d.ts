export { }
declare global {
    interface ComponentProps {
        className?: any,
        style?: Rc<any, any>,
    }
    interface LoginProps extends ComponentProps {
        modelValue: boolean,
        onModelValue: (e: boolean) => any
        onLogin: (e: boolean) => any
    }
    interface MKTableProps extends ComponentProps {
        songList: Song[]
    }
    interface SingleProps extends ComponentProps {
        data: Song[]
    }
    interface SonglistProps extends ComponentProps {
        data: Song[]
        idx: string
    }
    interface CommentProps extends ComponentProps {
        data: UserComment[]
    }
}

