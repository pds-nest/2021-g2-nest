import React from "react"
import Style from "./PageRepository.module.css"
import classNames from "classnames"
import BoxRepositoryTweets from "../components/interactive/BoxRepositoryTweets"


export default function PageRepository({ className, ...props }) {
    return (
        <div className={classNames(Style.PageRepository, className)} {...props}>
            <BoxRepositoryTweets
                tweets={[
                    {
                        "conditions": [],
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere lacinia eleifend. Maecenas a neque augue. Nulla dapibus lobortis gravida. Quisque quis ultricies elit. Donec in tortor augue. Cras eget aliquam felis. Nunc tempor, ipsum in lobortis tristique, nunc ante velit.",
                        "insert_time": "2021-05-18T18:56Z",
                        "location": null,
                        "place": "Casa mia",
                        "poster": "USteffo",
                        "snowflake": "1394698342282809344",
                    },
                ]}
            />
        </div>
    )
}
